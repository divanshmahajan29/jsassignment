
let items = [];
const getDate = async () => {
    try {
        const result = await fetch('data1.json');
        return await result.json();

    }
    catch (error) {

    }
}
export default getDate;