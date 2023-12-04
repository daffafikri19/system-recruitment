interface Question {
    pertanyaan: string;
    bobot: number;
}

export const quantatifAggregation = (questions: Question[], answers: number[]) => {
    // Hitung total nilai untuk setiap kriteria
    const totalScore: number[] = questions.map((kriteria, index) => {
        return answers[index] * kriteria.bobot;
    });

    // Hitung nilai total keseluruhan
    const nilaiTotal: number = totalScore.reduce((total, nilai) => total + nilai, 0);

    // Hitung skor dalam persentase
    const skorPersentase: number = (nilaiTotal / (questions.length * 5)) * 100;

    console.log(`Nilai Total: ${nilaiTotal}`);
    console.log(`Skor Persentase: ${skorPersentase.toFixed(2)}%`);

    // Tentukan apakah skor memenuhi persyaratan minimal
    const skorMinimal: number = 80;

    const lulus: boolean = skorPersentase >= skorMinimal;
    if (lulus) {
        console.log("Selamat! Anda lulus.");
    } else {
        console.log("Maaf, Anda belum mencapai skor minimal untuk lulus.");
    }
};
