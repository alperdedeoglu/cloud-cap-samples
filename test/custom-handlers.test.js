describe('Custom Handlers', () => {
  const { GET, POST, expect } = require('./capire').launch('bookshop')

  it('should reject out-of-stock orders', async () => {
    await expect(
      Promise.all([
        POST('/browse/submitOrder', { book: 201, amount: 5 }),
        POST('/browse/submitOrder', { book: 201, amount: 5 }),
        POST('/browse/submitOrder', { book: 201, amount: 5 }),
      ])
    ).to.be.rejectedWith(/409 - 5 exceeds stock for book #201/)
    const { data } = await GET`/admin/Books/201/stock/$value`
    expect(data).to.equal(2)
  })
})
