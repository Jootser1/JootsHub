
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { v4 as uuidv4 } from 'uuid';

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
        poll_id: uuidv4(),
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
      if (!groupedPolls[id].options[locale]) groupedPolls[id].options[locale] = [];
      for (let i = 1; i <= 10; i++) {
        const val = row[`Option${i}`];
        if (val && val.trim()) {
          groupedPolls[id].options[locale].push(val.trim());
        }
      }
    }
  }

  for (const poll of Object.values(groupedPolls)) {
    const createdPoll = await prisma.poll.create({
      data: {
        poll_id: poll.poll_id,
        type: poll.type,
        is_moderated: false,
        is_pinned: false,
        is_enabled: true,
        author: {
          connect: { user_id: "SYSTEM" } // ou un ID valide dans ta DB
        },
      }
    });

    await prisma.poll.update({
      where: { poll_id: poll.poll_id },
      data: {
        poll_translations: {
          create: Object.entries(poll.translations).map(([locale, question]) => ({
            locale,
            translation: question,
            poll_translation_id: uuidv4()
          }))
        },
        categories: {
          create: poll.categories.map((category_id) => ({
            category: {
              connect: { category_id }
            }
          }))
        }
      }
    });

    if (poll.type === 'CONTINUOUS' &&
        poll.scale.min && poll.scale.max && poll.scale.step) {
      await prisma.pollScaleConstraint.create({
        data: {
          poll_id: poll.poll_id,
          min_value: parseInt(poll.scale.min, 10),
          max_value: parseInt(poll.scale.max, 10),
          step_value: parseInt(poll.scale.step, 10),
        }
      });
    }

    if (['STEP_LABELED', 'MULTIPLE_CHOICE'].includes(poll.type)) {
      const frOptions = poll.options['fr_FR'] || [];
      const enOptions = poll.options['en_US'] || [];
      const esOptions = poll.options['es_ES'] || [];

      for (let i = 0; i < frOptions.length; i++) {
        const option = await prisma.pollOption.create({
          data: {
            poll_id: poll.poll_id,
            order: i,
            translations: {
              create: [
                { locale: 'fr_FR', translated_option_text: frOptions[i], id: uuidv4() },
                enOptions[i] ? { locale: 'en_US', translated_option_text: enOptions[i], id: uuidv4() } : undefined,
                esOptions[i] ? { locale: 'es_ES', translated_option_text: esOptions[i], id: uuidv4() } : undefined
              ].filter(Boolean)
            }
          }
        });
      }
    }

    console.log(`✅ Created poll: ${poll.poll_id}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
