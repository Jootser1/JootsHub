// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { authorize } from 'passport';
import path from 'path';

const prisma = new PrismaClient();
const authorId = 'cm972ep2g0000iums4nxf25p0';


const CATEGORY_TRANSLATIONS = [
  { id: 1, fr: 'Spiritualité', en: 'Spirituality' },
  { id: 2, fr: 'News & Politique', en: 'News & Politics' },
  { id: 3, fr: 'Technologie & Sciences', en: 'Technology & Science' },
  { id: 4, fr: 'Sexe', en: 'Sex' },
  { id: 5, fr: 'Fun', en: 'Fun' },
  { id: 6, fr: 'Média et Célébrité', en: 'Media & Celebrity' },
  { id: 7, fr: 'Relations Sociales', en: 'Social Relationships' },
  { id: 8, fr: 'Vie Quotidienne', en: 'Daily Life' },
  { id: 9, fr: 'Introspection', en: 'Introspection' },
  { id: 10, fr: 'Business', en: 'Business' },
  { id: 11, fr: 'Monde & Culture', en: 'World & Culture' },
  { id: 12, fr: 'Sport', en: 'Sport' },
];

async function main() {
  console.log('Cleaning existing data...');
  await prisma.questionOption.deleteMany();
  await prisma.question.deleteMany();
  await prisma.questionGroupCategory.deleteMany();
  await prisma.questionGroup.deleteMany();
  await prisma.categoryTranslation.deleteMany();
  await prisma.category.deleteMany();

  console.log('Seeding categories...');
  for (const cat of CATEGORY_TRANSLATIONS) {
    await prisma.category.create({
      data: {
        id: cat.id,
        translations: {
          create: [
            { locale: 'fr_FR', label: cat.fr },
            { locale: 'en_US', label: cat.en }
          ]
        }
      }
    });
  }


  console.log('Seeding questions from JSON...');
  const filePath = 'prisma/questions_structured_iso.json';
  //const filePath = path.join(__dirname, 'questions_structured_iso.json');
  console.log(filePath);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const groups = JSON.parse(rawData);

  for (const group of groups) {
    await prisma.questionGroup.create({
      data: {
        id: group.id,
        type: group.type,
        authorId: authorId,
        isModerated: group.isModerated,
        moderatedAt:
          group.moderatedAt && !isNaN(Date.parse(group.moderatedAt))
            ? new Date(group.moderatedAt)
            : null,
        pinned: group.pinned,
        enabled: group.enabled,
        createdAt: new Date(),

        categories: group.categories?.length
          ? {
              create: group.categories.map((categoryId: number) => ({
                category: { connect: { id: categoryId } }
              }))
            }
          : undefined,

        questions: {
          create: group.questions.map((q: any) => ({
            locale: q.locale,
            question: q.question
          }))
        },

        options: group.options?.length
          ? {
              create: group.options.flatMap((o: any) =>
                o.values.map((val: any) => ({
                  locale: o.locale,
                  label: val.label,
                  order: val.order
                }))
              )
            }
          : undefined
      }
    });
  }

  console.log('✅ Seed completed.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
