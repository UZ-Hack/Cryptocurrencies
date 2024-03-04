import axios from 'axios'
import { useEffect, useState } from 'react'
import CryptoItem from './CryptoItem'

interface Crypto {
	rank: number
	uuid: string
	name: string
	symbol: string
	price: number
	iconUrl: string
	marketCap: number
	volume24: number
}

const CryptoList: React.FC = () => {
	const [cryptos, setCryptos] = useState<Crypto[]>([])
	const [searchTerm, setSearchTerm] = useState('')

	const options = {
		method: 'GET',
		url: 'https://coinranking1.p.rapidapi.com/coins',
		params: {
			referenceCurrencyUuid: 'yhjMzLPhuIDl',
			timePeriod: '24h',
			'tiers[0]': '1',
			orderBy: 'marketCap',
			orderDirection: 'desc',
			limit: '50',
			offset: '0',
		},
		headers: {
			'X-RapidAPI-Key': '7d6de87501mshb33928abf23c86cp1d5093jsnfe6dfc097933',
			'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
		},
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.request(options)
				setCryptos(response.data.data.coins)
				console.log(response.data.data.coins)
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [])

	const filteredCryptos = cryptos.filter(
		crypto =>
			crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='container flex flex-col mx-auto my-8 w-10/12'>
			<input
				type='text'
				placeholder='Search...'
				className='p-2 border border-gray-300 rounded w-full mb-4'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<table className='table w-full border-collapse table-auto'>
				<thead className='w-full'>
					<tr className='text-xs w-full'>
						<th className='py-3 border-y border-gray-200'>Rank</th>
						<th className='py-3 border-y border-gray-200'>Name</th>
						<th className='py-3 border-y border-gray-200'>Symbol</th>
						<th className='py-3 border-y border-gray-200'>Price</th>
						<th className='py-3 border-y border-gray-200'>Market Cap</th>
						<th className='py-3 border-y border-gray-200'>Volume (24h)</th>
					</tr>
				</thead>
				<tbody className='w-full'>
					{filteredCryptos.map(crypto => (
						<CryptoItem
							key={crypto.uuid}
							rank={crypto.rank}
							name={crypto.name}
							symbol={crypto.symbol}
							price={Number(crypto.price)}
							image={crypto.iconUrl}
							marketCap={crypto.marketCap}
							volume24={crypto['24hVolume']}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default CryptoList
