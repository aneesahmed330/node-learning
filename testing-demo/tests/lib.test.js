const lib = require('../lib')

describe("absolute" , ()=> {
    it("if we give positive number it return positive number" , () => {
        const result = lib.absolute(1)
        expect(result).toBe(1)
    
    })
    
    it("if we give negative number it return positive number" , () => {
        const result = lib.absolute(-1)
        expect(result).toBe(1)
    
    })
    
    it("if we give zero number it return zero" , () => {
        const result = lib.absolute(0)
        expect(result).toBe(0)
    
    })

})

describe('greeting' , () => {
    it('it should greet message' , () => {
        const result = lib.greeting('mosh')
        expect(result).toContain('mosh')
    })
})
 
