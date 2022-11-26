import { Navbar } from "../../components/Navbar/Navbar"
import { Header } from "../../components/Header/Header"
import { Search } from "../../components/SearchBar/SearchBar"
import { Featured } from "../../components/Featured/Featured"
import './Home.css'
import { PropertyList } from "../../components/PropertyList/PropertyList"
import { Footer } from "../../components/Footer/Footer"

export const Home = () => {
    return (
        <> 
        <Navbar />
        <Header />
        <Search />
            <div className="homeContainer">
                {/* <Featured /> */}
                <h2 className="homeTitle">Browse By Room Types</h2>
                <PropertyList />
            </div>
            <Footer />
        </>
    )
}