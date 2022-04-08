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
import {BrComponent, BrManageContentButton, BrProps} from '@bloomreach/react-sdk';

export function FAQContent(props: BrProps) {
  const { document: documentRef } = props.component.getModels();
  const document = documentRef && props.page.getContent(documentRef);

  if (!document) {
    return null;
  }

  const { question, answer } = document.getData<DocumentData>();

  return (
    <div className={`${props.page.isPreview() ? 'has-edit-button' : ''}`}>
      <BrManageContentButton content={document} />
      { question && <h1>{question}</h1> }
      { answer && <div dangerouslySetInnerHTML={{ __html: props.page.rewriteLinks(answer.value) }} /> }
      <BrComponent path="faq-comments" />
    </div>
  );
}
