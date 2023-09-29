import sharingImg from "assets/images/sharing.png";
import documentImg from "assets/images/document.png";
import questionImg from "assets/images/question.png";

export const LIST_CATEGORIES = [
  {
    title: "Chia sẻ kinh nghiệm bản thân",
    description:
      "Lắng nghe chia sẻ của những người đi trước và nói lên những trải nghiệm thực tế của bản thân",
    imgSrc: sharingImg,
    btn: "Chia sẻ ngay",
    redirectLink: "/experiences",
  },
  {
    title: "Trao đổi tài liệu học tập",
    description:
      "Việc tìm kiếm những tài liệu học tập trở lên đơn giản hơn bao giờ hết",
    imgSrc: documentImg,
    btn: "Tra cứu tài liệu",
    redirectLink: "/documents",
  },
  {
    title: "Hỏi đáp",
    description:
      "Nêu lên những câu hỏi, thắc mắc trong quá trình học tập để nhận được sự hỗ trợ từ cộng đồng",
    imgSrc: questionImg,
    btn: "Tìm hiểu thêm",
    redirectLink: "/questions",
  },
];
