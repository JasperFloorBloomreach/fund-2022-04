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

import React from 'react';
import { Link } from 'react-router-dom';
import { Document } from '@bloomreach/spa-sdk';
import { BrManageContentButton, BrPageContext, BrProps } from '@bloomreach/react-sdk';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export function FAQList(props: BrProps) {
    const { document: documentRef } = props.component.getModels();
    const document = documentRef && props.page.getContent(documentRef);

    if (!document) {
        return null;
    }
    const { displayName, description, faqItems } = document.getData<DocumentData>();

    return (
        <div>
            { displayName && <h2>{displayName}</h2> }
            { description && <div dangerouslySetInnerHTML= {{ __html: props.page.rewriteLinks(description.value) }} /> }
            { faqItems.map((reference:string, key:string) => <FAQListItem key={key} item={props.page.getContent<Document>(reference)!} />) }
        </div>
    );
}

interface FAQListItemProps {
    item: Document;
}

export function FAQListItem({ item }: FAQListItemProps) {
    const page = React.useContext(BrPageContext)!;
    const { question, answer } = item.getData<DocumentData>();
    const classes = useStyles();

  return (
   <div className="card mb-3">
    <BrManageContentButton content={item} />
    <div className={classes.root}>
      <Accordion>
       <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1a-content"
           id="panel1a-header" >
          <Typography className={classes.heading}>
             { question && (
                 <h2 className="card-title">
                     <Link to={item.getUrl()!}>{question}</Link>
                 </h2>
             ) }
         </Typography>
       </AccordionSummary>
       <AccordionDetails>
           <Typography>
               { answer && <div dangerouslySetInnerHTML= {{ __html: page.rewriteLinks(answer.value) }} /> }
           </Typography>
       </AccordionDetails>
      </Accordion>
    </div>
  </div>
  );
}
