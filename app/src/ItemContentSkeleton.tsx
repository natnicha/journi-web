import { Text,Box, Skeleton, TextArea } from '@radix-ui/themes';

export function ItemContentSkeleton(){
  return (  
    <Box className="item-content">
      <Text as="div" size="2" className="item-title">
        <Skeleton  className="item-title">
          Lorem ipsum dolor sit amet,<br/>
        </Skeleton>
      </Text>

      <Text as="div" size="2" className="item-detail">
        <Skeleton>
          consectetur adipiscing elit.<br/>
        </Skeleton>
      </Text>

      <Text as="div" size="1" className="item-address">
        <Skeleton className="item-address">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque felis 
        erat, fringilla sed commodo sed, aliquet nec magna.
        </Skeleton>
      </Text>
      
      <Skeleton>
        <TextArea className="user-notes" size="1" radius="large" placeholder="What to do, see, or things to avoid?…" />
      </Skeleton>
    </Box>
  )
}