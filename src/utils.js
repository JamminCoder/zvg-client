export function capatalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

export function slugify(string) {
    let strings = string.split(" ");
    let stringsCount = strings.length
    let result = "";
    for (let i = 0; i < stringsCount; i++) {
        let s = strings[i];
        if (s !== "") {
            if (i < stringsCount - 1) result += `${s.toLowerCase()}_`;
            else result += `${s.toLowerCase()}`;
        }
    }
    return result;
}