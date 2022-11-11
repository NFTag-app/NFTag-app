import { ScrollView, View } from 'react-native'
import { UserData } from 'client-sdk/dist/types';
import { useUser } from 'client-sdk';

export const GameList = () => {
  const user: UserData = useUser();

  if(user) {
    return (
      <ScrollView>

      </ScrollView>
    )
  }
  return undefined;
  
}