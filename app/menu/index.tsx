import { Button, Switch } from 'react-native';
import { Link, Stack, usePathname, useRouter } from 'expo-router';
import React, { ReactElement, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar,
} from 'react-native';
import { ChevronRight, LucideIcon, Moon, Sun, Tags, User, User2 } from 'lucide-react-native';
import { useData } from '../../src/hooks/useData';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListItem = ({
  title,
  icon,
  link,
  action
}: {
  title: string
  icon: ReactElement<LucideIcon>
  link ?: string | null
  action? : ReactElement
}) => {
  const { theme } = useData();

  const content = (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
      gap: 8,
    }}>
        <View>
            { icon }
        </View>
        <Text style={{color: theme.tx, fontSize: 16}}>{title}</Text>
    </View>
  )

  if (link) {
    return (
      <Link href={link} asChild>
          <TouchableOpacity>
              <View style={[styles.listItemContainer, {backgroundColor: theme.ui}]}>
                {content}
                <ChevronRight color={theme.ui_3} style={{flexShrink: 1,}}/>
              </View>
          </TouchableOpacity>
      </Link>
    )
  } else {
    return (
      <View style={[styles.listItemContainer, {backgroundColor: theme.ui}]}>
        {content}
        {action}
      </View>
    );
  }
};

const ListSection = ({
  title,
  options,
}: {
  title?: string | null
  options: {
    title: string;
    icon: ReactElement;
    link: string;
  }[]
}) => {
  const { theme } = useData();

  return (
      <View>
        {title && <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: theme.tx,
          marginBottom: 8
        }}>{title}</Text>}
        <View style={{
          backgroundColor: theme.bg_2,
          marginBottom: 24,
          borderRadius: 16,
          display: 'flex',
          gap: 1,
          overflow: 'hidden'
        }}>
          { options.map((item, index) => (
              <ListItem key={index} {...item}/>
          )) }
        </View>
      </View>
  )
};

export default function index() {
  const router = useRouter();
  const { theme, isDark, handleIsDark } = useData();

  const MENU_ITEMS = [
    {
      title: null,
      options: [
        {
          title: 'Account',
          icon: <User color={theme.tx} />,
          link: 'menu/tags',
          action: null,
        },
        {
          title: 'Color Scheme:',
          icon: isDark ? <Moon color={theme.tx} /> : <Sun color={theme.tx} />,
          link: null,
          action: <Switch
            trackColor={{
              false: theme.ui_3,
              true: theme.ui_3
            }}
            // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor={theme.ui_3}
            onValueChange={() => handleIsDark(!isDark)}
            value={isDark}
          />,
        },
      ],
    },
    {
      title: null,
      options: [
        {
          title: 'Tags',
          icon: <Tags color={theme.tx} />,
          link: 'menu/tags',
        }
      ],
    },
  ];

  return (             
    <View>
      <Stack.Screen 
        options={{
          title: 'Settings',
          headerRight: () => <Button onPress={() => {router.back()}} title="Done" color={theme.blue}/>,
        }}
      />
      <View style={{padding: 24}}>
      { MENU_ITEMS.map((item, index) => (
          <ListSection key={index} {...item}/>
          // <Text key={item.title} style={{color: theme.tx}}>{item.title}</Text>
      )) }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  item: {
    padding: 16
  },
  header: {
    fontSize: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
  }
});