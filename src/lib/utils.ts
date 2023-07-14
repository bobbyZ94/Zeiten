export const serializeNonPOJOs = (obj: any) => {
	// better than json parse + stringify
	return structuredClone(obj)
}
