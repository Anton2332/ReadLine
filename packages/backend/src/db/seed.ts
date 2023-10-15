// @ts-nocheck
import { PrismaClient, Question } from '@prisma/client';
import { v4 } from 'uuid';
import { location, locationRegion, regions, sectors, subSectors } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  //await prisma.sector.createMany({ data: sectors });
}

main()
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log('Prisma data seed');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
