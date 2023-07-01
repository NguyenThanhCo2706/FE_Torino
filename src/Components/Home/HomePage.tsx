import { descriptionCategory } from "../../constraint"

export const HomePage = () => {
  return (
    <>
      <img
        className="w-full img-home text-center"
        src="https://static01.nyt.com/images/2022/04/08/dining/ld-church-cake/ld-church-cake-superJumbo.jpg" alt="" />
      <div className="my-[80px]">
        <h1 className="text-center text-[30px] font-bold">Xin chào, chúng tôi là Tiệm bánh Torino</h1>
      </div>
      <div>
        <div className="container mx-auto">
          <div className=" pb-5 border-b">
            <h1 className="text-[30px] font-bold my-5">CÂU CHUYỆN</h1>
            <div className="flex mb-10">
              <div className="w-1/2">
                <div className="me-5">
                  <p className="mb-5">
                    Bạn có tin rằng ẩm thực là một hành trình đáng để chinh phục không? Chúng tôi tin rằng mỗi một món ăn đều mang theo hơi thở của nơi mà nó được sinh ra, với những câu chuyện thú vị ẩn phía sau, về tình yêu, về gia đình, hay chỉ đơn giản là về cách mà nó được tạo ra. Và trên hành trình thưởng thức, mỗi thực khách đều có cơ hội khám phá về chính nét đẹp văn hóa dưới góc độ ẩm thực.
                  </p>
                  <p className="mb-5 italic">
                    Với mong muốn mang đến hơi thở của ẩm thực Âu, đặc biệt là nền ẩm thực Ý đến với Đà Nẵng, vào một ngày trời hè năm 2017, Torino đã bắt đầu hành trình của mình, bằng hương, bằng vị và cả cái hồn của những chiếc bánh.</p>
                  <p className="mb-5">
                    Như thể mỗi người đều có một nơi để thuộc về, chúng tôi hy vọng rằng bạn sẽ tìm thấy được chiếc bánh mà bạn yêu - thích tại Torino.
                  </p>
                </div>
              </div>
              <img className="w-1/2 hover:animate-pulse ps-5" src="https://torinobucket.s3-ap-southeast-1.amazonaws.com/home/c3813ba4-f48f-4080-b794-65b584dfb0bb.png" alt="" />
            </div>
            <div className="flex">
              <img className="w-1/2 pe-5 hover:animate-pulse" src="https://torinobucket.s3-ap-southeast-1.amazonaws.com/home/4100d1f7-3a0f-4f0c-8d30-c30cb5c443e8.png" alt="" />
              <div className="w-1/2">
                <div className="ms-5">
                  <p className="mb-5 italic">
                    Không chỉ dừng lại cái “quào” ngay từ miếng cắn đầu tiên, điều chúng tôi muốn đem lại chính là những dư vị ngọt ngào sau cùng khi trên dĩa đã không còn bất kì vụn bánh nào sót lại…
                  </p>
                  <p className="mb-5">
                    Một chiếc bánh ngon chỉ đơn thuần nằm ở hương vị và hình thức bên ngoài? Đối với Torino, chúng tôi không nghĩ vậy! Chúng tôi luôn tâm niệm rằng, một chiếc bánh chỉ thực sự trọn vẹn hương vị khi người thợ làm bánh đặt hoàn toàn tâm sức vào chính đưa con tinh thần đó. Bởi lẽ đó, mỗi chiếc bánh đều mang theo chính cái hồn của người thợ làm bánh. Và trong suốt hành trình chinh phục dạ dày của những thực khách, chúng tôi luôn mong muốn truyền tải cái hồn ấy vì chỉ cần một miếng cắn nhỏ thôi, tâm sức mà người thợ đặt để vào đều được thấu tỏ.
                  </p>
                  <p className="mb-5 font-semibold text-[20px]">
                    We can achieve almost anything if we pursue our dreams wholeheartedly.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {
            descriptionCategory.map((item, index: number) => (
              <div className="py-3 border-b" key={index}>
                <h1 className="text-[30px] font-bold my-5">{item.title}</h1>
                <div className="flex justify-center">
                  <img className="w-[300px] mb-3" src={item.image} alt="" />
                </div>
                <div className="">
                  <p>{item.content}</p>
                </div>
              </div>
            ))
          }
          <div className="h-[100px]"></div>
        </div>

      </div>
    </>
  )
}
