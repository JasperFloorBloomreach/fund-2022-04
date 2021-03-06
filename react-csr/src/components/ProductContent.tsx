/*
 * Copyright 2020 Bloomreach B.V. (http://www.bloomreach.com)
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
import {BrManageContentButton, BrProps} from '@bloomreach/react-sdk';

export function ProductContent(props: BrProps) {
  const {document: documentRef} = props.component.getModels<DocumentModels>();
  const document = documentRef && props.page.getContent(documentRef);

  if (!document) {
    return null;
  }

  const product = document.getData<Product>();
  return (
      <div className={props.page.isPreview() ? 'has-edit-button' : ''}>
        <BrManageContentButton content={document}/>
        {product.title && <h1>{product.title}</h1>}

        {product.introduction && <div className="well"><h3>{product.introduction}</h3></div>}
        <div className="row">
          <div className="col-sm-10">
            {product.description &&
            <div dangerouslySetInnerHTML=
            {{ __html: props.page.rewriteLinks(product.description.value) }}
            />}
          </div>
          <div className="col-sm-2">
            <ul className="list-group">
              {product.price && <li className="list-group-item active">Buy it for: {product.price}</li>}
              <li className="list-group-item">Available: ${product?.instock}</li>
              <li className="list-group-item">Rating: ${product?.rating}</li>
              <li className="list-group-item">
                Categories:
                {product?.categories?.map(category =>
                    <div key={category}>{category}</div>
                )}
              </li>
            </ul>
          </div>
        </div>


      </div>
  );
}
