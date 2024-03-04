import React from 'react'

interface ICryptoItem {
	rank: number
	name: string
	symbol: string
	price: number
	image: string
	marketCap: number
	volume24: number
}

const CryptoItem: React.FC<ICryptoItem> = ({
	rank,
	name,
	symbol,
	price,
	image,
	marketCap,
	volume24,
}) => {
	const formattedMarketCap = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(marketCap)

	const formattedVolume24 = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(volume24)

	return (
		<tr className='text-xs border-b border-gray-200 hover:bg-gray-50'>
			<td className='p-4'>{rank}</td>
			<td className='flex items-center gap-2 p-4'>
				<img className='w-4 h-4' src={image} alt={`${name} icon`} />
				<h2 className='font-bold text-gray-800'>{name}</h2>
			</td>
			<td className='p-4'>{symbol}</td>
			<td className='p-4'>${price.toFixed(2)}</td>
			<td className='p-4'>{formattedMarketCap}</td>
			<td className='p-4'>{formattedVolume24}</td>
		</tr>
	)
}

export default CryptoItem
