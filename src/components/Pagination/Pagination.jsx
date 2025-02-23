import useProductFilters from "../../hooks/useProductFilters";
import "./Pagination.css";

export default function Pagination({ page }){
    const {setFilters} = useProductFilters()
    const total = page?.totalPages || 1;
    const current = page?.number+1 || null;
    const previous  = current > 1? current -1 : null;
    const next = current != total ? current+1 : null;
    const last = (next != null && next != total)? total : null;
    const first = (previous != null && previous != 1)? 1: null;

    function setPage(pageNumber){
        setFilters({
            page:pageNumber
        })
    }

    return(
        <div className="pagination-container">
            <ul className="page">
                {first && <li value={first} onClick={(e)=>setPage(e?.target?.value)} className="page-element page-numbers">{first}</li>}
                {first && <li className="page-element page-dots">...</li>}
                {previous && <li value={previous} onClick={(e)=>setPage(e?.target?.value)} className="page-element page-numbers">{previous}</li>}
                {current && <li value={current} onClick={(e)=>setPage(e?.target?.value)} className="page-element page-numbers page-element-selected">{current}</li>}
                {next && <li value={next} onClick={(e)=>setPage(e?.target?.value)} className="page-element page-numbers">{next}</li>}
                {last && <li className="page-element page-dots">...</li>}
                {last && <li value={last} onClick={(e)=>setPage(e?.target?.value)} className="page-element page-numbers">{last}</li>}
            </ul>
        </div>
    )
}