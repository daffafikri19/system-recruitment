// "use server"
// import prisma from "@/lib/utils/prisma"

// interface ScoreTkbProps {
//     id_user: string,
//     benar: string,
//     salah: string,
//     kosong: string,
//     score: string,
// }

// export const saveTkbScore = async ({ id_user, benar, salah, score, kosong } : ScoreTkbProps) => {
//     try {
//         await prisma.nilai_tkb_user.upsert({
//             where: {
//                 id_user: id_user
//             },
//             create: {
//                 benar,
//                 salah,
//                 kosong,
//                 score,
//                 createdAt: new Date(Date.now()).toLocaleString(),
//                 id_user: id_user,
//             },
//             update: {
//                 benar,
//                 salah,
//                 kosong,
//                 score,
//                 createdAt: new Date(Date.now()).toLocaleString(),
//                 id_user: id_user,
//             }
//         });
//         return {
//             message: 'Berhasil menyimpan jawaban',
//             status: 200
//         }
//     } catch (error) {
//         return {
//             message: "Terjadi kesalahan server saat menyimpan nilai",
//             status: 500,
//             error: error
//         }
//     }
// }