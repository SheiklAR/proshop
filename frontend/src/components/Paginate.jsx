import { Link } from "react-router-dom"

const Paginate = ({pages, page, isAdmin=false,  keyword=''}) => {
    return <>
        <nav>
            <ul className="inline-flex -space-x-px text-sm">
                {pages > 1 && [...Array(pages).keys()].map((x) => (
                    <li key={x}>
                        <Link
                            to={keyword ? `/search/${keyword}/page/${x + 1}` : !isAdmin ? `/page/${x + 1}` : `/admin/productlist/page/${x + 1}`}

                            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 ${page === x + 1 ? `bg-gray-200` : `bg-white`} border-2 border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>{x + 1}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    </>;
}

export default Paginate