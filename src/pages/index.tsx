import { HomeContainer, Product } from "../styles/pages/home";
import Image from "next/image";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import camisa1 from '../assets/1.png'
import camisa2 from '../assets/2.png'
import camisa3 from '../assets/3.png'
import { stripe } from "../lib/stripe";
import { GetServerSideProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        const NUMBER_OF_DECIMAL_PLACES = 2
        return (
          <Product className="keen-slider__slide" key={product.id}>
            <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
            <footer>
              <strong>{product.name}</strong>
              <span>Preço: {product.price.toFixed(NUMBER_OF_DECIMAL_PLACES)}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const TO_REAIS = 100
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / TO_REAIS,
    }
  })

  return {
    props: {
      products
    }
  }
}