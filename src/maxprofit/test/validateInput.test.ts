import {MaxProfitInput} from "../maxprofit.types";
import {validateInput} from "../validateInput";
import {StorageEngineInterface} from "../../storageEngine/storageEngine.interface";

describe('validateInput', () => {
    it('should not throw error for valid input', () => {
        const mockPrices = [1, 2]
        const validInput: MaxProfitInput = {start: 0, end: 1}
        const storageEngineMock: StorageEngineInterface = {
            getMinTime: jest.fn( () => 0),
            getMaxTime: jest.fn( () => 1),
            getPrices: async (_start: number, _end: number) => mockPrices
        }
        let error
        let res: MaxProfitInput | undefined = undefined
        try {
            res = validateInput(validInput, storageEngineMock)
        } catch (err) {
            error = err
        }
        expect(error).toBeUndefined()
        expect(res).toStrictEqual(validInput)
    })
})