
export const usersAccordingToPage = (data, currentPage, usersPerPage) => {

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    return data.slice(startIndex, endIndex)
}
