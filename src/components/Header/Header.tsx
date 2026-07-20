import "../TextHeadings/TextHeadings.css"

const Header = ({title}: { title: string }) => {
    // que estranho
    return (
        <header className="bg-emerald-500 dark:bg-emerald-900  flex-row justify-evenly">
            <h1 className="font-bold text-1xl p-3 text-sky-50">{title ? title : "FinFin"}</h1>
            <nav></nav>
        </header>
    );
};

export default Header;
