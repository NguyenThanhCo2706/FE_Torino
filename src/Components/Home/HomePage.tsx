
export const HomePage = () => {

  return (
    <>
      <img
        className="w-full img-home text-center"

        src="https://static01.nyt.com/images/2022/04/08/dining/ld-church-cake/ld-church-cake-superJumbo.jpg" alt="" />
      <div className="p-[20px]">
        <h1 className="text-center text-[30px] m-10">Hi, We’re Torino Bakery and Restaurant</h1>
        <p className="mx-auto w-2/3 text-center">
          Since its launch in the United States in 2004, TOUS les JOURS has developed into a reputable bakery & café franchise,
          specializing in French-Asian-inspired baked goods, passionately made from the finest ingredients.
          TOUS Les JOURS means “Every day” in French, and as the name shows, the chain offers
          a wide range of baked goods made fresh in-store every day.
          The bakery chain offers more than 300 different kinds of baked goods, including artisan pastries,
          gourmet cakes and desserts, and handcrafted beverages.
          The brand takes pride in sourcing and using carefully selected ingredients and promises to bring freshness and quality to its customers. TOUS les JOURS continues to expand and embrace innovation in all markets.

          Currently, there are more than 70 stores in the U.S. and more than 1,650 stores worldwide.
        </p>
      </div>
      <div>
        <div className="container mx-auto">
          <div className="flex items-center p-10">
            <img className="w-1/2 hover:animate-pulse" src="https://www.tljus.com/wp-content/uploads/2019/11/ingredient.jpg" alt="" />
            <div className="w-1/2 p-10 flex flex-col">
              <h1 className="text-[30px] font-bold">Freshness & Quality</h1>
              <p className="leading-8">TOUS les JOURS promises to bring freshly baked products made with quality ingredients to your table every day. We will only serve products that we feel confident in feeding our own families.</p>
            </div>
          </div>
          <div className="flex items-center p-10">
            <div className="w-1/2 p-10 flex flex-col items-end">
              <h1 className="text-[30px] font-bold">Joyful Experience</h1>
              <p className="leading-8 text-right">We want to not only bring great food, but smiles to our patrons’ faces. Whether it be in form of breakfast, lunch, or dessert, TOUS les JOURS wants to be the flavor that brings joy to your day.</p>
            </div>
            <img className="w-1/2" src="https://www.tljus.com/wp-content/uploads/2019/12/joyful1.jpg" alt="" />
          </div>
          <div className="flex items-center p-10">
            <img className="w-1/2" src="https://www.tljus.com/wp-content/uploads/2020/01/global2.jpg" alt="" />
            <div className="w-1/2 p-10">
              <h1 className="text-[30px] font-bold">Global Presence</h1>
              <p className="leading-8">We want to be where you are – with over 1,650 locations worldwide, TOUS les JOURS continues to grow. Wherever you may be in the world, TOUS les JOURS will be there to give the taste of home.</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
