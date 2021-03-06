import React,{useState,useEffect} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {useRouter} from 'next/router'
import { api } from '../../pages/api/api'
import {useCookies} from 'react-cookie';
import Image from 'next/image'
import Fileinput from '@brainhubeu/react-file-input'
export default function MissionAgility() {

    const router = useRouter()
    const [cookie, setCookie] = useCookies(["me"])
    const [consultant,setConsultant]=useState("")
    const [consultant_company_info,setConsultantCompanyInfo]=useState([])
    const [company_info,setCompanyInfo]=useState([])
    const [company_representative,setCompanyRepresentative]=useState([])
    const [signature,setSignature]=useState([])
  
    useEffect(()=>{
        let data=cookie
        if(data.me){

            let user = jwt_decode(JSON.stringify(data))
            setConsultant(user)
            axios.post(`${api}/getCompanyInfoById`,{
              id:user.user_id
            }).then((reponse)=>{
                setConsultantCompanyInfo(reponse.data)
            })
            axios.post(`${api}/getCompanyInfoById`,{
                id:router.query.by
            }).then((reponse)=>{
                setCompanyInfo(reponse.data)
                axios.post(`${api}/getUserInfoById`,{
                    user_id:reponse.data.company_representative_id
                }).then((reponse2)=>{
                    setCompanyRepresentative(reponse2.data)
                })
            })
        }
  
    },[])

    return (
        <div className="consultant">
            <div className="pages">

                <div className="page orientationV spaceBetween">
                    <div >

                        <div className="orientationH center spaceBetween">
                            <Image src="/images/logo.png" alt="logo" width={150} height={60}/>
                            <div >
                                <span > AGILITY A RECRUIT</span>
                            </div>
                        </div>
                        <div className="center">Mandat de recrutement sign?? hors ??tablissement</div>
                        <br></br> 
                        Num??ro de Mandat : XXXXXXXXXX
                        <br></br> 
                        <br></br> 
                        <div className="orientationH parties-prenantes">
                            <div>
                                <span className="bold">Le Mandant</span><br></br>
                                L???employeur :<br></br> 
                                Nom et pr??nom du repr??sentant l??gale :<br></br>  {company_info.company_president}<br></br> 
                                D??nomination sociale : {company_info.company_name}<br></br> 
                                N?? RCS et Lieu :  {company_info.company_rcs}<br></br> 
                                Code APE:  {company_info.company_ape}<br></br> 
                                N?? TVA : {company_info.company_tva}<br></br> 
                                Si??ge social: {company_info.company_headquarters} <br></br> 
                                Code postale et ville : {company_info.company_zip_code+" "+company_info.company_city}<br></br> 
                                T??l :  {company_info.company_phone_number}<br></br> 
                                Courriel :  {company_info.company_email}<br></br> 
                                Nom du charg?? de recrutement :<br></br> {company_representative.user_name+ " "+company_representative.user_firstname}
                                <br></br> 
                            </div>
                            <div>
                                <span className="bold"> Le Mandataire<br></br> Le Cabinet de Recrutement A RECRUIT :</span>
                                <br></br> Nom et pr??nom du consultant A RECRUIT:<br></br> 
                                {consultant.user_name+ " "+consultant.user_firstname}<br></br>
                                D??nomination sociale:  {consultant_company_info.company_rcs}<br></br> 
                                N?? RCS et Lieu : {consultant_company_info.company_rcs}<br></br> 
                                Code APE : {consultant_company_info.company_ape}<br></br> 
                                N?? TVA : {consultant_company_info.company_tva}<br></br> 
                                Si??ge social : {consultant_company_info.company_headquarters} <br></br> 
                                Code postale et ville :{consultant_company_info.company_zip_code+" "+consultant_company_info.company_city} <br></br> 
                                T??l :  {consultant_company_info.company_phone_number}<br></br> 
                                Courriel :  {consultant_company_info.company_email}<br></br> 
                                Nom du charg?? d???affaire (exemple Mandataire ou salari?? du cabinet)<br></br> 

                            </div>

                        </div>

                        <br></br>                     

                        <span className="bold"> Il a ??t?? arr??t?? et convenu ce qui suis :</span>
                        Aux termes du pr??sent mandat, ??tabli conform??ment ?? la r??glementation en vigueur, le Mandant conf??re au Mandataire, qui l???accepte, 
                        <span className="bold"> MANDAT SEMIS EXCLUSIF DE RECHERCHE DE CANDIDAT</span> ?? Recrutement ??, correspondant ?? la description figurant ci-apr??s.
                        Il est express??ment pr??cis?? que le pr??sent mandat ??tant un<span className="bold"> MANDAT SEMIS EXCLUSIF</span>, le Mandant s???interdit de recrut?? par l???interm??diaire de tout autres professionnels, le candidat, sujet du pr??sent mandat Il est pr??cis?? que le pr??sent Mandat ??tant un Mandat semis-exclusif, Le mandant conserve la facult?? de rechercher par lui-m??me un acqu??reur, s???engageant ?? diriger sur le mandataire les demandes qui lui seront adress??es personnellement. 
                        <br></br>
                        <br></br>
                        <div>
                            <span className="bold">1.Description :
                            <br></br>
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Poste ?? pourvoir:</span>
                            <br></br>
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;a.1. Titre du poste :</span> <br></br>       
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;a.2. Type de contrat :</span>     CDD, CDI, CPE, Freelance, ???<br></br>
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;a.3. Lieu d???ex??cution : </span>    D??partement d???exercice<br></br>

                        </div>
                    </div>
                    <div className="pied_page orientationH spaceBetween">
                        <div className="parafe"></div>
                        <div>Page 1/4</div>

                    </div>
                </div>
                <div className="page orientationV spaceBetween">
                    <div >
                        <div className="orientationH center spaceBetween">
                            <Image src="/images/logo.png" alt="logo" width={150} height={60}/>
                            <div >
                                <span > AGILITY A RECRUIT</span>
                            </div>
                        </div>
                        <div className="center">Mandat de recrutement sign?? hors ??tablissement</div>
                        <br></br>
                        <div>
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;a.4. R??mun??ration :</span>                                                                                Fourchette de remun??ration annuele
                                        15KE ?? 20KE, 20KE ?? 25KE, 25KE ?? 30KE, ??? <br></br>   
                            <span className="bold">&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Candidat recherch?? </span><br></br>
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;b.1. Niveau d?????tude :</span>     Sans, CAP,BEP, BP, BAC, BTS, ???<br></br>
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;b.2. Exp??rience : </span>    0??3, 3??5, 5??8, 8??10???<br></br>
                            <br></br>      
                        </div>
                        <div className="italic"> Descriptif d??taill?? du poste ?? pourvoir et du candidat recherch?? en annexe des pr??sentes, voir ?? cahier des charges de recrutement ??</div>

                        Le Mandant d??clare et certifie avoir la capacit?? de financer le dit poste, il certifie sur l???honneur que rien dans sa situation juridique ou fiscale ne s???oppose au recrutement du futur candidat, ni ?? l???ex??cution du pr??sent <span className="bold">MANDAT SEMIS EXCLUSIF </span> et que les informations ci-dessus sont exactes et correspondent bien ?? sa recherche.
                        <br></br>En cas de d??faillance cach?? volontairement ou fausse d??claration le Mandant s'engage ?? verser, ?? titre de clause p??nale, une indemnit?? forfaitaire de cinq mille euros (5 000 euros).

                        <br></br><br></br>2.Dur??e du Mandat :
                        Le pr??sent mandat exclusif est donn?? ?? compter de ce jour pour une dur??e irr??vocable de six mois. A l'issue de ce d??lai, il sera tacitement prorog?? pour une dur??e maximale de six mois soit jusqu'au    XX / XX / XXXX, date ?? laquelle il prendra automatiquement fin.
                        En outre, pass?? le d??lai de six mois, le pr??sent mandat pourra ??tre d??nonc?? ?? tout moment par chacune des parties, ?? charge pour celle qui entend y mettre fin d'en aviser l'autre partie 15 jours au moins ?? l'avance par lettre recommand??e avec demande d'avis de r??ception.

                        <br></br><br></br>3.Conditions du Mandat Semis Exclusif de Recrutement ?? AGILITY A RECRUTE ?? : <br></br><br></br>
                        <div className="orientationH spaceBetween contrat-two-collumn">
                            <div>
                                Conform??ment au pr??sent mandat, le Mandant donne tous pouvoirs au Mandataire pour accomplir, pour son compte et en son nom, toutes les d??marches que le Mandataire jugera utiles pour la recherche du candidat ad??quat, notamment insertion d'annonces publicitaire dans des site internet sp??cialis??s.
                                Le Mandant d??clare ne pas avoir consenti, par ailleurs, de mandat de recrutement en cours et s'interdit de le faire sans avoir pr??alablement d??nonc?? le pr??sent Mandat Semis Exclusif.
                                En outre, le mandant conserve la facult?? de rechercher par lui-m??me un candidat, s???engageant ?? diriger sur le mandataire les demandes qui lui seront adress??es personnellement. Dans le cas o?? le recrutement se r??aliserait avec   un candidat
                            </div>
                            <div>
                                pr??sent?? par le mandant, la r??mun??ration du mandataire serait automatiquement r??duite dans les proportions indiqu??es, au paragraphe ?? R??mun??ration du Mandataire ??.
                                Toutefois, le mandataire reste tenu de mener ?? bien sa mission cons??cutive au pr??sent mandat telle qu???elle r??sulte des obligations et des pouvoir stipul??s ci-dessus.
                                Le Mandant s'oblige ?? valider tout candidat pr??sent?? par le Mandataire,                            
                                sans discrimination d???aucune sorte, ni privil??ges ou pr??f??rences (qu???elle soit de race, de sexe, de religions, ???), correspondant pr??cis??ment ?? la description, charges et conditions du pr??sent mandat.
                                A d??faut, apr??s une mise en demeure rest??e infructueuse, il s'engage ?? indemniser le Mandataire. 
                            </div>
                        </div>
                    
                    </div>
                    <div className="pied_page orientationH spaceBetween">
                        <div className="parafe"></div>
                        <div>Page 2/4</div>

                    </div>
                </div>
                <div className="page orientationV spaceBetween">
                    <div>

                        <div className="orientationH center spaceBetween">
                            <Image src="/images/logo.png" alt="logo" width={150} height={60}/>
                            <div >
                                <span > AGILITY A RECRUIT</span>
                            </div>
                        </div>
                        <div className="center">Mandat de recrutement sign?? hors ??tablissement</div>
                        <br></br>
                        <div className="orientationH spaceBetween contrat-two-collumn">
                            <div>
                                Le montant de l'indemnit?? ; ?? titre de clause p??nale, une indemnit?? forfaitaire de cinq mille euros (5 000 euros).
                                Le pr??sent mandat ??tant semis-exclusif, pendant toute la dur??e du pr??sent mandat et de sa prorogation, le Mandant s???interdit de traiter par l???interm??diaire d???un autre mandataire la recherche de candidat correspondant ?? la description figurant ci-dessus. 
                                Il s'interdit ??galement, apr??s l???expiration  
                            </div>
                            <div>
                                du mandat et pendant une dur??e d'un an, de recruter un candidat qui lui aurais ??t?? pr??sent?? par le mandataire sans passer par son interm??diaire.
                                A d??faut, le Mandant s'engage ?? verser, ?? titre de clause p??nale,une indemnit?? forfaitaire de cinq mille euros (5 000 euros) qui s???ajoutera ?? la valeur des honoraires que le Mandataire aurait d?? percevoir pour le recrutement du dit candidat. 
                            </div>
                        </div>
                        <br></br>

                        4.R??mun??ration du mandataire :
                        Dans l'hypoth??se du recrutement du candidat propos?? par le Mandataire, ledit Mandataire aura droit ?? une r??mun??ration couvrant les frais de dossiers, de d??placement ainsi que les frais de s??lection et pr??sentation du/des candidat(s), fix??e ?? :
                                            (De 14 ?? 23%) TTC de la r??mun??ration brute annuel que percevra le candidat, devenant exigible le jour de la signature du contrat de travail du dit candidat.
                        Sauf s???il est fait application de la clause ?? semi-exclusif ?? pr??vue au pr??sent Mandat de recrutement. ?? Clause semi-exclusif ??, auquel cas, la r??mun??ration du mandataire sera r??duite de 30%, le cas ??ch??ant ou le Mandant aurait apport?? le candidat.
                        Il est pr??cis?? que si le Mandataire ne propose pas de candidat ou aucun candidat correspondant aux besoins du mandant, ce dernier ne percevra aucune r??mun??ration et restera tenu des frais engag??s pour la recherche.

                        <br></br><br></br>5.Droit de r??tractation - Le cas ??ch??ant ou le pr??sent Mandat serait sign?? en dehors des locaux du Mandataire
                        Le mandant ??tant professionnel les parties devront se conformer aux dispositions de l???article L121-16-1 du code de la consommation.
                        Le droit de r??tractation de 14 jours ?? compter de la r??ception du bien ou de la date de conclusion du contrat de service s???applique aux professionnels qui (article L121-16-1 du Code de la consommation) ont moins de 5 salari??s dans l???entreprise, si le contrat est conclu hors ??tablissement et si l???objet du contrat n???est pas dans le champ d???activit?? principale de l???entreprise.
                        Si ces trois conditions sont r??unies, l'entreprise b??n??ficie d'un droit de r??tractation de 14 jours de m??me que les consommateurs particuliers.
                        Pour faire valoir ce droit, le client devra r??pondre aux exigences l??gales et faire parvenir sa volont?? de se r??tracter par lettre recommand?? avec avis de r??ception dans le d??lai de 14 jours, au cabinet de recrutement A RECRUIT en charge de son dossier
                        <br></br>Article L.121-21-2 ??? extrait : ?? le consommateur informe le professionnel de sa d??cision de r??tractation en lui adressant, avant l???expiration du d??lai pr??vu ?? l???article L.121-21, le formulaire de r??tractation mentionn?? au 2 du 1 de l???article L.121-17 ou toute autre d??claration, d??nu??e d???ambig??it??, exprimant sa volont?? de se r??tracter ??.

                        <br></br> <br></br>6.Election de domicile :
                        Pour l???ex??cution du pr??sent contrat les parties font ??lection de domicile aux adresses indiqu??es en t??te des pr??sentes Mandat simple de recrutement et s'engagent ?? informer l'autre partie de tout changement d'adresse.

                        
                    </div>
                    <div className="pied_page orientationH spaceBetween">
                        <div className="parafe"></div>
                        <div>Page 3/4</div>

                    </div>

                </div>
                <div className="page orientationV spaceBetween">
                    <div>

                        <div className="orientationH center spaceBetween">
                            <Image src="/images/logo.png" alt="logo" width={150} height={60}/>
                            <div >
                                <span > AGILITY A RECRUIT</span>
                            </div>
                        </div>
                        <div className="center">Mandat de recrutement sign?? hors ??tablissement</div>
                        <br></br>
                        Le Mandant reconnait express??ment, avoir pris connaissance des CGV et les acceptes 
                        <br></br>Le Mandant reconnait express??ment, avoir re??u et pris connaissance de la note d???information pr??contractuelle. 

                        <br></br><br></br>Fait en deux exemplaires originaux ?? : Ville du si??ge sociale du client employeur                    
                        <br></br>Le : date de signature 
                        <br></br><br></br>
                        <div className="orientationH spaceBetween signatures">
                            <div className="un">
                                Le Mandant<br></br>
                                Cachet, Pr??nom, Nom du/des signataire(s)
                                Pr??c??d??e de la mention manuscrite
                                ?? Bon pour pouvoir ??
                            </div>
                            <div className="deux">
                                Le Mandataire<br></br>
                                Signature, Cachet pr??c??d??e de la mention manuscrite
                                ?? Bon pour acceptation ??
                                <label className="signature-upload">
                                    <Fileinput
                                        label='Awesome Uploader'
                                        onChangeCallback={(e)=>{setSignature(e)}}
                                       
                                    />

                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="pied_page orientationH spaceBetween">
                        <div className="parafe"></div>
                        <div>Page 4/4</div>

                    </div>
                </div>
            </div>

        </div>
    )
}
