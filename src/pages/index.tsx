import { HomeContainer, Product } from "../styles/pages/home";
import Image from "next/image";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
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
        return (
          <Product className="keen-slider__slide" key={product.id}>
            <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / TO_REAIS,)
    }
  })
  const SECONDS = 60
  const SECONDS_TO_MINUTES = 60
  const MULTIPLY_TO_TWO_HOURS = 2
  const TWO_HOURS = (SECONDS * SECONDS_TO_MINUTES) * MULTIPLY_TO_TWO_HOURS
  return {
    props: {
      products
    },
    revalidate: TWO_HOURS
  }
}