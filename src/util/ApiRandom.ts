const getWordFile = async (wordType: string) =>
    await (
        await fetch(
            (process.env.NODE_ENV === "production" ? "https://words-aas.vercel.app/db/" : "http://localhost:3000/db/") +
            wordType,
        )
    ).text();

const getRandomWord = (contents: string) => {
    contents = contents.replace(/[\r]/g, "");
    const words = contents.split("\n");
    words.pop();
    const i = Math.floor(Math.random() * words.length);
    return words[i];
};


export async function wordGenerator(word: string) {
    let phrase = "";
    const allWordTypes = ["animals", "verbs"];

    if (!allWordTypes.includes(word)) {
        throw Error("word type not found");
    }
    const filePath = word + ".txt";
    phrase = getRandomWord(await getWordFile(filePath)) + " ";

    return phrase
}