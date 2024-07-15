import search_bar_styles from './search_bar.module.scss';

export default function SearchBar() {
    return (
        <div className={search_bar_styles.container}>
            <form >
                <div >
                    <div className={search_bar_styles.searchContainer}>
                        <input  type="text" placeholder="Search..." />
                        <button type="submit">Go</button>
                    </div>

                    <div className={search_bar_styles.filterContainer}>
                        <input type="checkbox" id="zoo" name="zoo" value="zoo" />
                        <label htmlFor="zoo"> Zoo</label>
                    
                        <input type="checkbox" id="national_parks" name="national_parks" value="national_parks" />
                        <label htmlFor="national_parks"> National Parks</label>
                    
                        <input type="checkbox" id="state_parks" name="state_parks" value="state_parks" />
                        <label htmlFor="state_parks"> State Parks</label>
                    
                        <input type="checkbox" id="other" name="other" value="other" />

                        <label htmlFor="other"> Other</label>
                        <button type="button">Filter</button>

                    </div>
                </div>
                <br></br>
                
            </form>

        </div>
    )
}

