export const FontFamilyChange = (theme, isAr, En, Ar) => {
    return isAr == "ar" ? theme.fontFaces[Ar] : theme.fontFaces[En];
}
