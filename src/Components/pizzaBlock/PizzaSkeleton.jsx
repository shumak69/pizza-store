import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f7ba64"
    foregroundColor="#f6f4f4"
    {...props}
  >
    <circle cx="140" cy="125" r="125" /> 
    <rect x="20" y="266" rx="10" ry="10" width="240" height="25" /> 
    <rect x="0" y="310" rx="15" ry="15" width="280" height="85" /> 
    <rect x="0" y="417" rx="10" ry="10" width="99" height="42" /> 
    <rect x="180" y="417" rx="10" ry="10" width="99" height="42" />
  </ContentLoader>
)

export default PizzaSkeleton