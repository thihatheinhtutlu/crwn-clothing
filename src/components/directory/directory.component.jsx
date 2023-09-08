import CategoryItem from "../category-item/category-item.component";
import './directory.styles.scss'


const Directory = ({categoreis}) => {
    return (
        <div className="directory-container">
            {categoreis.map((category) => {
        return (
            <CategoryItem key={category.id} category={category}/>
        )
        })};
    </div>
    )
};

export default Directory;