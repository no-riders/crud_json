const entries = require('./entries')

jest.mock('./data/data.json', () => ({
    data: [
        { id: '1', name: 'Test', price: '100' },
    ],
}))

describe('#addEntry', () => {
    const { addEntry, saveEntryRecord } = entries

    it('should return null when called without args', () => {
        expect(addEntry()).toEqual(null)
        expect(addEntry('aaa')).toEqual(null)
    })

    it('should throw if id exists', () => {        
        expect(()=> {
            addEntry('1', 'b', 'c');
        }).toThrow()
    })

    it('should retun new record in callback', () => {
        entries.saveEntryRecord = jest.fn()

        addEntry('10', 'new', '100', (newRecord) => {
            // expect(newRecord).toEqual({
            //     id: '10',
            //     name: 'new',
            //     price: '100',
            // })
        })
    })
})