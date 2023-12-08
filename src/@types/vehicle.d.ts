type Brand = {
    idbrand?: number,
    brandName: string
}

type Model = {
    idmodel?: number,
    idbrand?: number,
    modelname: string
}

type Vehicle = {
    plate?: string,
    owner: string,
    color: string,
    idbrand: number,
    idmodel: number,
    brand?: brand,
    model?: model
}