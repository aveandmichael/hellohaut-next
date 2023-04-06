import axios from "axios"
import { useEffect } from 'react'
import styles from './Pdp.module.scss';
import Image from 'next/image'

const ProductItem = ({ product }) => {
    if (!product) return null

    return (
        <div className={styles.Item}>
            <div className={styles.ItemMatchRating}>
                <p>{product.match_result}% Ubereinstimmung</p>
            </div>
            <div className={styles.ItemImg}>
                <Image src={product.image_link} alt={product.name} width="100" height="100" />
            </div>
            <div className={styles.ItemDetail}>
                <a href = "#" className={styles.ItemBrand}>{product.brand}</a>
                <a href = "#" className={styles.ItemName}>{product.name}, {product.size}ml</a>
                {/* <div>
                    <span class="fa fa-star ${product.stars >= 1 ? "checked" : ""}"></span>
                    <span class="fa fa-star ${product.stars >= 2 ? "checked" : ""}"></span>
                    <span class="fa fa-star ${product.stars >= 3 ? "checked" : ""}"></span>
                    <span class="fa fa-star ${product.stars >= 4 ? "checked" : ""}"></span>
                    <span class="fa fa-star ${product.stars >= 5 ? "checked" : ""}"></span>
                </div> */}
                <div className={styles.ItemPrice}>
                    <span className={styles.NewPrice}>${product.price} €</span>
                </div>
                <p></p>
                <a type="button" href={`http://www.awin1.com/cread.php?awinmid=10076&awinaffid=1273535&pref1=${product.product_id}&p=${product.link}`} className={styles.AddBtn} target="_blank">Product Page</a>
            </div>
        </div>
    )
}

export default function Pdp({ data }) {

    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <div className={styles.MainWrapper}>
            <div className={styles.Container}>
                <div className={styles.MainTitle}>
                    <h1></h1>
                </div>
                {/* <div className={styles.DisplayStyleBtns}>
                    <button type="button" id="grid-active-btn">
                        <i className="fas fa-th"></i>
                    </button>
                    <button type="button" id="details-active-btn">
                        <i className="fas fa-list-ul"></i>
                    </button>
                </div> */}
                {!data || (data && !data.data) ? (
                    <div className={styles.LoadingIndicator}>
                        <Image src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/images/loading.gif" alt="Loading..." width="30" height="30" />
                        <p>Calculating results...</p>
                    </div>
                ) : (
                    <div className={styles.ItemList}>
                        {data && data.data && data.data.map((product) => {
                            return (<ProductItem product={product} />)
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let params = {}

    if (context && context.query) {
        params = context.query
    }

    let data = []
    data = await axios.get(`https://hellohaut-next.vercel.app/api/product_match/?SkinID=${params.SkinID}&authenticationToken=${params.authenticationToken}&category=Serum`);
  
    return {
      props: {
        data: data && data.data ? data.data : []
      },
    }
  }