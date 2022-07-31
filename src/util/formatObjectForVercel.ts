export const formatObjectForVercel = (obj: Object | undefined) => {
    if (!obj) {
        return ''
    }
    const arr: string[] = []
    for (const [key, value] of Object.entries(obj)) {
        arr.push(`${key}=${value}`)
    }
    return arr.join('&')
}