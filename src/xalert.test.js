import { describe, it, expect } from "vitest";
import xAlert from "./xalert";


describe('xalert', () => {
    it('supports empty config', () => {
        expect(xAlert).toBeTypeOf('function')
    })
})