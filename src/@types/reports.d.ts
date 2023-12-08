type ReportIn = {
    idrepin?: number,
    plate?: string,
    dni?: string,
    inhour: string,
    reason: string,
    vehicle?: vehicle,
    employee?: employee
}

type ReportOut = {
    idrepout?: number,
    dni?: string,
    exithour: string,
    idrepin?: number,
    employee?: employee
    reportIn?: ReportIn
}