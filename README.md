# NoBotForm
Validation to block robots on send form

## Author
Wallace Rio <wallrio@gmail.com>

## Instalation
Include the scripts and style on your document

    <script type="text/javascript" src="nobotform.js"></script>
    <link rel="stylesheet" type="text/css" href="nobotform.css">

## Usage
Only include the class 'nobotform' on your tag form and a element with class 'resultmsgalert', after a complete package, you have an active validity.

### Example:

    <form class="nobotform"  data-nobotform-action="http://...">
        <input name="name" type="text" value="" placeholder="Name:">
        <input name="email" type="text" value="" placeholder="Email:">	        
        <input type="submit" value="Send">
    </form>

OBS:
    use the attribute (data-nobotform-action) with action target


### Define messages and behaviors

- To define the checkbox text include in the form tag the 'data-checklabel' attribute with the text to be shown as value.
- To set the validation response message include the 'data-msgalert' attribute with the text to be shown as value.

#### Example:

    <form class="nobotform" data-checklabel="Select to send" data-msgalert="Fill in the fields correctly" data-nobotform-action="http://...">
        <input name="name" type="text" placeholder="Name:">
        <input name="email" type="text" placeholder="Email:">
        <span class="resultmsgalert"></span>
        <input type="submit" value="Send">
    </form>

### Define messages and behaviors by javascript

    <script type="text/javascript">
        nobotform.msgalert = "Select the checkbox to send";
        nobotform.checklabel = "Select to send";
        nobotform.error = function(msgalert){						
            this.querySelector('.resultmsgalert').innerHTML = msgalert;
        }
        nobotform.success = function(msgalert){						
            this.querySelector('.resultmsgalert').innerHTML = "";
            return false;
        }
    </script>


- nobotform.msgalert    =   (string)    Sets the validation response message
- nobotform.checklabel  =   (string)    Sets the text of the checkbox
- nobotform.error       =   (function)  Defines a code to be executed if the form is not validated correctly
- nobotform.success     =   (function)  Defines a code to be executed if the form is validated successfully
