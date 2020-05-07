const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

//Filtrando produtos pelo ID
function getProductsIds(ids, productsList) {

	const filterId = (product) => ids.includes(product.id);
	return productsList.filter(filterId);
}

//Listando as categorias dos produtos
function getCategories(products) {
	return [...new Set(products.map((product) => product.category))];
}

//Retornando as promoções de cada categoria
function getPromotion(categories) {
	return promotions[categories.length - 1];
}


//Listando os produtos pelo nome e Categoria
function productsNameAndCategory(products) {
	return products.map(({ name, category }) => ({ name, category }));
}


//Retornando o preço regular de cada produto
function getPrices(products) {
	return products.map(({ regularPrice }) => regularPrice);
}


//Obtendo as promoções de cada lista de produto.
function getDiscountedPrices(products, promotion) {
	return products.map(({ promotions, regularPrice }) => {
		const productPromotions = promotions || [];
		const inPromotion =
			productPromotions.find(({ looks }) => looks.includes(promotion)) || {};
		return inPromotion.price || regularPrice;
	});
}


//Funcão que irá ser responsável por montar o Carrinho de Produtos.
function getShoppingCart(ids, productsList) {

	//Dividindo cada parte em uma variavel
	const products = getProductsIds(ids, productsList);
	const categories = getCategories(products);
	const promotionValue = getPromotion(categories);
	const prices = getPrices(products);
	const discountedPrices = getDiscountedPrices(products, promotionValue);


	//Formula do valor do produto
	const soma = (total, value) => total + value;
	const format = (value) => value.toFixed(2);


	//Somando os preços e calculando o desconto
	const price = prices.reduce(soma, 0);
	const discountedPrice = discountedPrices.reduce(soma, 0);
	const discountValor = price - discountedPrice;
	const discountPercent = 100 - (100 * discountedPrice) / price;

	//Monta resultado para retorno
	const resultado = {
		products: productsNameAndCategory(products),
		promotion: promotionValue,
		totalPrice: format(discountedPrice),
		discountValue: format(discountValor),
		discount: `${format(discountPercent)}%`,

	};

	//retornando um objeto com os produtos com seus valor e desconto.
	return resultado;
}


module.exports = { getShoppingCart };
