// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { readFileSync, existsSync } from 'fs';
import * as argon2 from 'argon2';
import csv from 'csv-parser';
import { createReadStream } from 'fs';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Import des données JSON
const categoryTranslations = JSON.parse(readFileSync('../../packages/config/category_translations.json', 'utf-8'));
const filename = 'real_pollseeddata.csv';

// Définir un type pour les données du CSV
interface CsvData {
  ID: string;
  type: string;
  locale: string;
  fr_FR: string;
  category: string;
  min_value: string;
  max_value: string;
  step_value: string;
  Option1?: string;
  Option2?: string;
  Option3?: string;
  Option4?: string;
  Option5?: string;
  Option6?: string;
  Option7?: string;
  Option8?: string;
  Option9?: string;
  Option10?: string;
  isModerated?: string;
  pinned?: string;
  enabled?: string;
  en_US?: string;
  es_ES?: string;
}

type PollType = 'OPEN' | 'MULTIPLE_CHOICE' | 'CONTINUOUS' | 'STEP_SCALE' | 'STEP_LABELED' | 'YES_NO_IDK';
type LocaleCode = 'fr_FR' | 'en_US' | 'es_ES';

interface PollData {
  poll_id: string;
  type: PollType;
  categories: number[];
  translations: Record<LocaleCode, string>;
  options: Record<LocaleCode, string[]>;
  scale: {
    min: string;
    max: string;
    step: string;
  };
}

async function main() {
  console.log('Cleaning existing data...');
  // Supprimer d'abord les enregistrements dépendants
  await prisma.auth.deleteMany();
  await prisma.pollAnswer.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.message.deleteMany();
  await prisma.userContact.deleteMany();
  await prisma.pollAnswerHistory.deleteMany();
  await prisma.pollAnswerSource.deleteMany();
  await prisma.pollOptionTranslation.deleteMany();
  await prisma.pollTranslation.deleteMany();
  await prisma.pollOption.deleteMany();
  await prisma.pollScaleConstraint.deleteMany();
  await prisma.userCategoryPreference.deleteMany();
  await prisma.category.deleteMany();
  await prisma.pollCategory.deleteMany();
  await prisma.poll.deleteMany();
  await prisma.userAttribute.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.user.deleteMany();
  await prisma.conversation.deleteMany();

  console.log('Création de Jootser 1...');
  const hashedPassword = await argon2.hash('bobby1');
  const jootser1 = await prisma.user.create({
    data: {
      username: 'Jootser1',
      user_number: 1,
      avatar: null,
      last_seen: new Date(),
      role: 'LISTENER',
      auth: {
        create: {
          email: 'jootser1@joots.com',
          password: hashedPassword,
        },
      },
      user_settings: {
        create: {
          app_language: 'fr_FR',
          accepted_languages: ['fr_FR'],
          is_available_for_chat: true,
        },
      },
    },
  });
  console.log(`Jootser 1 créé avec succès. ID utilisateur: ${jootser1.user_id}`);

  const hashedPassword2 = await argon2.hash('bobby2');
  const jootser2 = await prisma.user.create({
    data: {
      username: 'Jootser2',
      user_number: 2,
      avatar: null,
      last_seen: new Date(),
      role: 'USER',
      auth: {
        create: {
          email: 'jootser2@joots.com',
          password: hashedPassword2,
        },
      },
      user_settings: {
        create: {
          app_language: 'fr_FR',
          accepted_languages: ['fr_FR'],
          is_available_for_chat: true,
        },
      },
    },
  });
  console.log(`Jootser 2 créé avec succès. ID utilisateur: ${jootser2.user_id}`);

  console.log('Création des catégories à partir de category_translations.json...');
  
  for (const cat of categoryTranslations) {
    await prisma.category.create({
      data: {
        category_id: cat.id,
        name: cat.en,
      },
    });
  }

 


  // Lire le fichier CSV
  const csvPath = path.join(__dirname, 'data', filename);
  const records: CsvData[] = [];
  
  await new Promise<void>((resolve, reject) => {
    createReadStream(csvPath)
      .pipe(csv({ 
        separator: ';',
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data: CsvData) => {
        console.log('Ligne CSV brute:', {
          ID: data.ID,
          locale: data.locale,
          type: data.type,
          question: data.fr_FR
        });
        records.push(data);
      })
      .on('end', () => resolve())
      .on('error', (error) => reject(error));
  });

  console.log('\nNombre total de lignes lues:', records.length);
  console.log('Exemple de groupement par ID:');
  const rowsByPollId: Record<string, CsvData[]> = {};

  // Regrouper les lignes par ID de sondage
  for (const row of records) {
    const id = row.ID?.trim();
    if (!id) {
      console.log('Ligne ignorée - ID manquant:', row);
      continue;
    }
    console.log('Traitement ligne:', { id, locale: row.locale, type: row.type });
    if (!rowsByPollId[id]) {
      rowsByPollId[id] = [];
    }
    rowsByPollId[id].push(row);
  }

  console.log('Groupement par ID:', Object.entries(rowsByPollId).map(([id, rows]) => ({
    id,
    locales: rows.map(r => r.locale)
  })));

  // Créer les sondages à partir des lignes groupées
  for (const [id, rows] of Object.entries(rowsByPollId)) {
    const frRow = rows.find(r => r.locale === 'fr_FR');
    const enRow = rows.find(r => r.locale === 'en_US');
    const esRow = rows.find(r => r.locale === 'es_ES');

    if (!frRow || !enRow || !esRow) {
      console.log(`Skipping poll ${id}: missing one or more languages`);
      continue;
    }




    const type = frRow.type?.toUpperCase() as PollType;
    const categories = frRow.category?.split(',').map((c) => parseInt(c.trim(), 10)) || [];

    try {
      const createdPoll = await prisma.poll.create({
        data: {
          poll_id: uuidv4(),
          type,
          is_moderated: false,
          is_pinned: false,
          is_enabled: true,
          author: {
            connect: { user_id: jootser1.user_id }
          },
          poll_translations: {
            create: [
              { locale: 'fr_FR', translation: frRow.fr_FR?.trim() || '', poll_translation_id: uuidv4() },
              { locale: 'en_US', translation: enRow.fr_FR?.trim() || '', poll_translation_id: uuidv4() },
              { locale: 'es_ES', translation: esRow.fr_FR?.trim() || '', poll_translation_id: uuidv4() }
            ]
          },
          categories: {
            create: categories.map(category_id => ({
              category: {
                connect: { category_id }
              }
            }))
          }
        }
      });

      if (type === 'CONTINUOUS' && frRow.min_value && frRow.max_value && frRow.step_value) {
        await prisma.pollScaleConstraint.create({
          data: {
            poll_id: createdPoll.poll_id,
            min_value: parseInt(frRow.min_value, 10),
            max_value: parseInt(frRow.max_value, 10),
            step_value: parseInt(frRow.step_value, 10),
          }
        });
      }

      if (['STEP_LABELED', 'MULTIPLE_CHOICE'].includes(type)) {
        for (let j = 1; j <= 10; j++) {
          const optionKey = `Option${j}` as keyof CsvData;
          const frVal = frRow[optionKey];
          const enVal = enRow[optionKey];
          const esVal = esRow[optionKey];

          if (frVal && frVal.trim()) {
            await prisma.pollOption.create({
              data: {
                poll_id: createdPoll.poll_id,
                order: j - 1,
                translations: {
                  create: [
                    { locale: 'fr_FR', translated_option_text: frVal.trim(), id: uuidv4() },
                    ...(enVal && enVal.trim() ? [{ locale: 'en_US', translated_option_text: enVal.trim(), id: uuidv4() }] : []),
                    ...(esVal && esVal.trim() ? [{ locale: 'es_ES', translated_option_text: esVal.trim(), id: uuidv4() }] : [])
                  ]
                }
              }
            });
          }
        }
      }


 // Créer dans la table poll_option et ses tables jointes les data nécessaires pour les sondages de type YES_NO_IDK



      if (type === 'YES_NO_IDK') {
        await prisma.pollOption.create({
          data: {
            poll_id: createdPoll.poll_id,
            order: 0,
            translations: {
              create: [{ locale: 'fr_FR', translated_option_text: 'Oui', id: uuidv4() }, { locale: 'en_US', translated_option_text: 'Yes', id: uuidv4() }, { locale: 'es_ES', translated_option_text: 'Sí', id: uuidv4() }]
            }
          }
        });
        await prisma.pollOption.create({
          data: {
            poll_id: createdPoll.poll_id,
            order: 1,
            translations: {
              create: [{ locale: 'fr_FR', translated_option_text: 'Non', id: uuidv4() }, { locale: 'en_US', translated_option_text: 'No', id: uuidv4() }, { locale: 'es_ES', translated_option_text: 'No', id: uuidv4() }]
            }
          }
        });
        await prisma.pollOption.create({
          data: {
            poll_id: createdPoll.poll_id,
            order: 2,
            translations: {
              create: [{ locale: 'fr_FR', translated_option_text: 'Je ne sais pas', id: uuidv4() }, { locale: 'en_US', translated_option_text: 'I don\'t know', id: uuidv4() }, { locale: 'es_ES', translated_option_text: 'No sé', id: uuidv4() }]
            }
          }
        });
      }


    } catch (error) {
      console.error(`Erreur lors de la création du sondage ${id}:`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
