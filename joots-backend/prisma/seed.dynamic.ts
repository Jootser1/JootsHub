
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

async function main() {
  const csvPath = path.join(__dirname, 'data', 'polls.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';'
  });

  const groupedPolls = {};

  for (const row of records) {
    const id = row['ID'];
    if (!groupedPolls[id]) {
      groupedPolls[id] = {
        type: row['type'],
        categories: row['category'].split(',').map((c) => parseInt(c.trim(), 10)),
        translations: {},
        options: {},
        scale: {
          min: row['min_value'],
          max: row['max_value'],
          step: row['step_value']
        }
      };
    }

    const locale = row['locale'];
    const question = row[locale];
    if (question) {
      groupedPolls[id].translations[locale] = question.trim();
    }

    if (['STEP_LABELED', 'MULTIPLE_CHOICE'].includes(row['type'])) {
      groupedPolls[id].options[locale] = [];
      for (let i = 1; i <= 10; i++) {
        const val = row[`Option${i}`];
        if (val && val.trim()) {
          groupedPolls[id].options[locale].push(val.trim());
        }
      }
    }
  }

  for (const [id, poll] of Object.entries(groupedPolls)) {
    const createdPoll = await prisma.poll.create({
      data: {
        type: poll.type,
        categories: {
          connect: poll.categories.map((id) => ({ id }))
        },
        translations: {
          create: Object.entries(poll.translations).map(([locale, question]) => ({
            locale,
            question
          }))
        },
        ...(poll.type === 'CONTINUOUS' &&
          poll.scale.min && {
            scaleConstraint: {
              create: {
                minValue: parseFloat(poll.scale.min),
                maxValue: parseFloat(poll.scale.max),
                stepValue: parseFloat(poll.scale.step)
              }
            }
          }),
        ...(poll.type === 'STEP_LABELED' || poll.type === 'MULTIPLE_CHOICE'
          ? {
              options: {
                create: poll.options['fr_FR']?.map((label, index) => ({
                  label,
                  order: index
                }))
              }
            }
          : {})
      }
    });

    console.log(`✅ Poll created: ${createdPoll.id}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
