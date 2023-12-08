import { generateQueryKeys } from "./functions";

const employeeQueryKeys = generateQueryKeys("employeeKeys")
const brandQueryKeys = generateQueryKeys("brandKeys")
const modelQueryKeys = generateQueryKeys("modelKeys")
const reportInQueryKeys = generateQueryKeys("reportInQueryKeys")
const reportOutQueryKeys = generateQueryKeys("reportOutQueryKeys")

export {
    employeeQueryKeys,
    brandQueryKeys,
    modelQueryKeys,
    reportInQueryKeys,
    reportOutQueryKeys
}