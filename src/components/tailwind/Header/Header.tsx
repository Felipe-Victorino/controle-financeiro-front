import "../../../styles/TextHeadings.css"
import "./Header.css"
import AuthNavbar from "@/components/tailwind/Navbar/AuthNavbar.tsx";

interface HeaderTypes {
    title: string,

}

const Header = ({title}: HeaderTypes) => {
    // que estranho
    return (
        <header className="header">
            <h1 className="font-bold text-1xl p-3 text-sky-50">{title ? title : "FinFin"}</h1>

            {<AuthNavbar/>}
        </header>
    );
};

export default Header;
