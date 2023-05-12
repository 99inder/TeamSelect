export const uniqueDomainsFinder = (data) => {

    return [...new Set(data.map((e) => e.domain))];

}