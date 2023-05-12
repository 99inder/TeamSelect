export const getDomains = (data) => {

    return [...new Set(data.map((e) => e.domain))];

}

export const getGenders = (data) => {

    return [...new Set(data.map((e) => e.gender))];

}