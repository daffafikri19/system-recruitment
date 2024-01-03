// "use server"
// import prisma from "@/lib/utils/prisma"

// interface ScoreTpaProps {
//     id_user: string,
//     benar: string,
//     salah: string,
//     kosong: string,
//     score: string,
// }

// export const saveTpaScore = async ({ id_user, benar, salah, score, kosong } : ScoreTpaProps) => {
//     try {
//         await prisma.nilai_tpa_user.upsert({
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