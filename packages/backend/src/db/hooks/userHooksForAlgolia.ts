// import { PrismaClient } from '@prisma/client';

// export const setupUserHooksForAlgolia = (
//   prisma: PrismaClient
//   //  algoliaService: AlgoliaService
// ) => {
//   prisma.$use(async (params, next) => {
//     if (params.model !== 'profile') {
//       return next(params);
//     }
//     if (params.action === 'delete') {
//       const { id, userId } = params.args.where;
//       let findProfile = null;
//       if (id) {
//         findProfile = await prisma.profile.findUnique({ where: { id } });
//       }
//       if (userId) {
//         findProfile = await prisma.profile.findUnique({ where: { userId } });
//       }
//       if (findProfile && findProfile.id) {
//         // const deletedEmployerIds = (await prisma.employer.findMany({ where: { profileId: findProfile.id } }))?.map((item) => item.id);
//         // deletedEmployerIds?.forEach(async (it) => algoliaService.deleteObject(it?.toString(), AlgoliaIndexes.EMPLOYERS));
//         // await algoliaService.deleteObject(findProfile?.id?.toString(), AlgoliaIndexes.USERS);
//       }
//     }

//     const result = await next(params);

//     if (params.action === 'create') {
//       const resultId = result?.id;
//       if (!resultId) return result;

//       const created = await prisma.profile.findUnique({ where: { id: resultId } });

//       if (created.id && created.fullName) {
//         await algoliaService.saveObject(
//           { objectID: created.id.toString(), fullName: created.fullName, imageUrl: created.imageUrl },
//           AlgoliaIndexes.USERS
//         );
//       }
//     }

//     if (params.action === 'update') {
//       const resultId = result?.id;
//       if (!resultId) return result;

//       const updated = await prisma.profile.findUnique({ where: { id: resultId } });
//       await algoliaService.updateObject(
//         { objectID: updated.id.toString(), fullName: updated.fullName, imageUrl: updated.imageUrl },
//         AlgoliaIndexes.USERS
//       );
//     }
//     return result;
//   });
// };
