import Header from "../Header"
import { Footer } from "../footer"

export const Home = (props: any) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
