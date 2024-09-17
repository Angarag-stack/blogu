import Footer from "./Footer"
import { Header } from "./Head"

export const Layout=(props)=>{
    const {children}=props
    return <div>
        <Header></Header>
        {children}
        <Footer></Footer>
    </div>
}