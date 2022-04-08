/*
 * Copyright 2020 Bloomreach (http://www.bloomreach.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useEffect, useState} from 'react';
import {BrProps} from '@bloomreach/react-sdk';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText} from '@material-ui/core';

export function FAQComments(props: BrProps) {

  const url = props.page.getUrl()!;
  const lastSlash = url.lastIndexOf("-");
  const lastDot = url.lastIndexOf(".");
  const id = url.substring(lastSlash!+1, lastDot);

  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<any>([]);

  const classes = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }))();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?postId="+id)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [id])

  if (error) {
    return <div>Error: {error!.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <List className={classes.root}>
        {items.map((item:any) => (
          <React.Fragment key={item.name}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={item.name.toUpperCase()} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={item.email}
                secondary={item.body}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    );
  }
}
