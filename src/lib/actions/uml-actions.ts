import axios from "@/lib/axios";

export async function getUML(): Promise<UML[]> {
    try {
        const response = await axios.get('api/umls');
        // console.log(response.data.data)
        return response.data.data;
    } catch (err) {
        console.log('err', err);
        return [];
    }
}

export async function getUMLById(id: number) {
    try {
        const response = await axios.get(`api/umls/${id}`);
        return response.data.data;
    } catch (err) {
        console.log('err', err);
        return {};
    }
}
export async function updateUML(id: number, content: { content: string }) {
    // console.log({content})
    await axios.patch(`api/umls/${id}`, content).then((response) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    });
}